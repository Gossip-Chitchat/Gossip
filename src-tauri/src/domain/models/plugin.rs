#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Plugin {
    pub id: String,
    pub name: String,
    pub description: String,
}