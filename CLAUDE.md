# CLAUDE.md

給 Claude Code 在這個 repo 工作時的指引。UI 文案與文件以繁體中文為主，程式碼識別字用英文。

## 專案是什麼

**Gossip** 是一款給同一個內網（LAN）團隊用的「摸魚」匿名聊天桌面 app（Tauri 2 + React + Rust）。核心承諾：

- **免架伺服器**：建立聊天室的人（房主）的 app 本身就是中繼伺服器，其他人貼上連結就能加入；房主關掉 app，聊天室就結束。
- **零資料庫、零紀錄**：訊息只存在記憶體，關掉就消失。
- **偽裝主題**：聊天介面可切成 Excel / IDE / 郵件 / 終端機等「工作畫面」，每人各自設定。
- **老闆警示**：快捷鍵（預設 `Ctrl+Shift+B`）向房內所有人廣播「老闆來了」，並自動切到安全主題。
- **跨平台**：Windows / macOS / Linux 安裝檔。

姊妹 repo：[`Gossip-Chitchat/Gossip-Landing`](https://github.com/Gossip-Chitchat/Gossip-Landing) 是對外的宣傳 landing page（Vite + React + shadcn/ui，push `main` 即部署到 S3/CloudFront，用 Mixpanel 追蹤）。**Landing 上寫的功能就是這個 app 的產品目標**，改動產品行為時要對照它。規劃與進度記在 Notion：<https://app.notion.com/p/henryliking/Gossip-1c52d7148c2580c28b50edb152f47a2d>。

## 目前狀態（重要）

這是**早期原型**，最後一次實質開發是 2025-04-04，至今**尚無法真正多人聊天**。已完成的是 UI 殼與後端分層骨架：

| 區塊 | 狀態 |
|---|---|
| 首頁（建立/加入）、側邊欄、設定頁、快捷鍵說明、自訂 TitleBar | UI 完成 |
| 5 個主題插件（default / excel / code / mail / terminal） | UI 完成，可切換 |
| `create_chatroom` command → 產生 UUIDv7 存進記憶體 HashMap | 可用 |
| actix-web WebSocket server（`/ws`） | 只把收到的訊息轉給**本機** Tauri 視窗，沒有廣播 |
| 加入房間、成員列表、暱稱、廣播、老闆警示同步、設定儲存 | **尚未實作** |

動手前先讀下面「已知問題」，很多看起來像 bug 的行為其實是「還沒做」。

## 常用指令

```bash
npm ci                 # 安裝前端依賴（只用 npm；lockfile 含各平台原生套件）
npm run dev            # 只跑前端 Vite（http://localhost:1420），Tauri API 呼叫會失敗
npm run tauri dev      # 跑完整桌面 app（需要 Rust toolchain + 各平台 Tauri 系統依賴）
npm run lint           # ESLint（目前 0 error；剩下的 warning 是 shadcn 檔案的 fast-refresh 提示與 useChatRoom 的 hook 依賴）
npm run type-check     # tsc -b（strict）
npm test               # Vitest（jsdom），測試檔與原始碼放一起：*.test.ts(x)
npm run build          # tsc -b && vite build，也是 tauri build 的 beforeBuildCommand

cd src-tauri
cargo fmt --check
cargo clippy --all-targets --locked -- -D warnings
cargo test --locked
```

- Linux 編 Rust 需先裝 `libwebkit2gtk-4.1-dev libayatana-appindicator3-dev librsvg2-dev`（CI 同樣這樣裝）。
- `src-tauri/Cargo.lock` 有進版控；Rust 的 `tauri` crate 與 npm 的 `@tauri-apps/api` / `@tauri-apps/cli` 要維持同一個 minor 版本（目前 2.11），升級時兩邊一起動。
- CI（`.github/workflows/ci.yml`）對 `main` 的 push 與 PR 執行兩個 job：frontend（lint → test → build）與 rust（fmt → clippy → test）。送 PR 前在本機跑過上面這些指令。

### 測試慣例

- 前端：Vitest + Testing Library，setup 在 `src/test/setup.ts`（載入 jest-dom matcher）。要測呼叫 Tauri command 的程式碼時，用 `@tauri-apps/api/mocks` 的 `mockIPC` / `clearMocks` 模擬 IPC，不要直接 mock `invoke`。
- 後端：單元測試寫在各檔案底部的 `#[cfg(test)] mod tests`；service / usecase 的相依以 trait 注入，測試時用簡單的 stub struct 實作 trait。
- 多機 LAN 測試（Docker 模擬多台主機）的規劃見 Notion 頁面的「測試策略」段落；需要先把網路核心做成可以不開 GUI 執行。

## 架構

### 前端（`src/`）

- 路由（`src/App.tsx`）：`/` → `AppHome`（建立/加入）；`/app` → `AppLayout`（側邊欄）底下 `/app/chat` → `ChatRoom`、`/app/settings` → `AppSettings`。
- 主題插件：`src/types/theme-plugins.ts` 定義 `ThemePlugin`（`headerComponent` / `messagesComponent` / `inputComponent` / `wrapperClassName`），實作在 `src/plugins/themes/*`，由 `src/plugins/ThemeManager.tsx` 的 `useThemeManager()` 取用。新增主題 = 新增一個 `ThemePlugin` 並加進 `builtInThemes` 與 `ThemeType` union。
- 聊天邏輯集中在 `src/hooks/useChatRoom.ts`（WebSocket 連線、送訊息、老闆警示、`Ctrl+Shift+B`）。建立/加入房間在 `useRoomCreation.ts` / `useRoomJoining.ts`。
- `src/components/ui/` 是 shadcn/ui 產生的元件，除非必要不要手改；需要新元件用 shadcn CLI 加（設定在 `components.json`）。
- 路徑別名 `@/` → `src/`。Tailwind + `tailwindcss-animate`；`AnimatedElement` 是共用的進場動畫包裝。
- 視窗是無邊框（`decorations: false`），拖曳與最小化/最大化/關閉由 `src/components/ui-elements/TitleBar.tsx` 透過 `@tauri-apps/api/window` 處理；新增視窗操作要同步在 `src-tauri/capabilities/default.json` 開權限。

### 後端（`src-tauri/src/`）

採 Clean / Hexagonal 分層，依賴方向由外向內：

```
commands/            Tauri #[command]，前端 invoke() 的入口
  └─> domain/ports/          use case 介面（CreateRoomPort …）
        └─ application/usecase/    實作 port，呼叫 service
              └─> domain/service/      service trait
                    └─ application/service/   實作，呼叫 repository
                          └─> domain/repository/   repository trait
                                └─ application/repository/  記憶體 HashMap 實作
application/infrastructure/server/route.rs   actix-web WebSocket handler
domain/models/        ChatRoom、Plugin、AppState、CloudEvent<T>
init.rs               組裝依賴（DI）並產生 AppState
main.rs               啟動 actix-web（tokio::spawn）+ Tauri，並用 mpsc 把 WS 訊息 emit 到前端
```

- **這個分層是刻意保留的設計決策**（見 Notion Product Design 的架構決策紀錄）：不要為了「MVP 比較快」而合併或移除 port / usecase / service / repository 任何一層。新的網路功能（LAN Hub、之後可能的雲端中繼）也要以 port + adapter 的方式接進來。
- 每層都用 `Arc<Mutex<dyn Trait>>` 注入；新增功能照同樣路徑：port → usecase → service → repository，最後在 `init.rs` 組裝、在 `AppState` 掛上、在 `main.rs` 的 `generate_handler!` 註冊 command。
- `domain/models/events/mod.rs` 已定義 CloudEvents 1.0 格式的 `CloudEvent<T>`，這是預定的事件信封（新訊息、新成員加入、老闆警示），但**目前沒有任何地方使用**。
- 訊息序列化：後端偏好 MessagePack（`rmp-serde`；前端 `@msgpack/msgpack`），也接受 JSON text 並轉成 msgpack。
- `domain/ports/user.rs`、`domain/ports/external_notifier_port.rs` 沒被 `mod.rs` 引入，所以不會編譯（後者引用了不存在的 `events::Event`）；啟用前要先修。
- `src-tauri/src/lib.rs` 是空的（`Cargo.toml` 宣告了 `gossip_lib`，但實際邏輯都在 `main.rs`），所以後端目前無法在不開 Tauri 視窗的情況下單獨執行或做整合測試。
- 尚未接上任何 command 的 port / repository 方法用 `#[allow(dead_code)]` 標註保留；接上後記得拿掉標註。

### 目前的訊息資料流（實際行為）

```
ChatRoom UI ──JSON text──> ws://127.0.0.1:9123/ws ──> ChatWebSocket (actix actor)
   ──msgpack bytes──> std::sync::mpsc ──> thread ──> main_window.emit("chat-message", bytes)
   ──> （前端沒有人監聽 "chat-message"，訊息就此消失）
```

## 已知問題（與產品目標的主要差距）

1. **只綁 `127.0.0.1:9123`**：LAN 上其他電腦連不進來。目標是「房主即中繼」，需要綁 `0.0.0.0`（或可設定）並把房主 LAN IP 放進邀請連結。
2. **沒有廣播**：WS server 沒有 session / room registry，不會把訊息送回任何 WS client。
3. **前端收不到訊息**：`useChatRoom` 的 `ws.onmessage` 等待 server 回送（不會發生）；`useChatMessages` 聽 `chat-message-msgpack`，後端 emit 的是 `chat-message`，且這個 hook 沒被任何元件使用；`App.tsx` 聽 `receive-message`（沒人 emit）並用 `alert()`。
4. **加入流程壞掉**：`useRoomJoining` 導向 `/chat`，但路由是 `/app/chat`；也沒有真的連到房主。「連結」目前只是 UUID，沒有 host 位址，沒有 QR code。
5. **老闆警示只在本機**：不會廣播；快捷鍵寫死且只在視窗聚焦時有效（非 global shortcut）；設定頁的快捷鍵 / 主題 / 音效選項按「儲存」只會 `alert()`，沒有持久化。
6. **成員是假資料**：`ChatRoom.tsx` 寫死 4 個使用者，送出者一律是 `'You'`，沒有暱稱機制。
7. **Commands 多為 stub**：`get_chatroom`、`get_chatroom_list`、`delete_chatroom`、plugins 相關 command 回傳假值；`install_plugin` 未註冊。
8. **Commands 與實作的對照**：`docs/api/` 記錄目前註冊的 command 與它們是否為 stub，改 command 時要同步更新那張表。
9. **安全面**：WS 沒有任何驗證、未加密（`ws://`）、`tauri.conf.json` 的 `csp` 為 `null`；房間 ID 用 UUIDv7（含時間戳，可部分推測），若要當作邀請憑證應改用高熵隨機 token。
10. **發佈**：沒有 release workflow，Landing 的「Windows / macOS / Linux 下載」按鈕都只連到 GitHub repo 首頁。

修這些問題時，以 Landing page 的功能描述與 Notion 規劃為準。

### 文件分工

- `docs/`：只描述**目前程式碼實際的行為**（command、通訊管道、功能流程）。改了行為就要同步改 `docs/`，不要把還沒做的設計寫進去。
- Notion 的 Gossip 頁面與其下的 Product Design 頁面：目標設計、設計取捨與決策紀錄。功能實作完成後，再把對應內容搬進 `docs/`。

## 開發慣例

- **Commit message**：遵守 `.cursor/rules/git-commit.mdc`，格式 `<type>(scope): <summary>`，type 限 `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`，現在式、72 字元內、不加句點；常用 scope：`chat`、`ui`、`tauri`、`hotkey`、`server`、`readme`。一個 commit 只做一件事。
- 分支：`feature/<name>` → PR 到 `main`。
- 前端：函式元件 + Hooks，2 空格縮排、單引號、分號（見 `CONTRIBUTING.md`）；UI 文案用繁體中文。
- 後端：新邏輯放對應分層，不要把業務邏輯直接寫進 `commands/` 或 `main.rs`。目前大量 `println!` 除錯輸出是既有風格，新程式碼可沿用，但別新增敏感內容（訊息內文）到 log——產品承諾是不留痕跡。
- **隱私不變式**：不得新增任何把訊息寫入磁碟、資料庫、log 檔或外部服務的行為；設定檔（主題、快捷鍵、暱稱）可以存本機。
