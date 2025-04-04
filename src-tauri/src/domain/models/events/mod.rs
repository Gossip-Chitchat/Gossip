#![allow(unused)]

pub mod chat;
pub mod notification;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CloudEvent<T> {
    // Required fields
    /// 事件唯一 ID
    pub id: String,
    /// 事件來源
    pub source: String,
    /// CloudEvents 規範版本（預設為 "1.0"）
    pub specversion: String,
    /// 事件類型
    pub type_: String,
    /// 事件時間
    pub time: DateTime<Utc>, // Need to add chrono serde feature
    /// 事件資料(泛型T)
    pub data: T,
    /// 事件主題
    pub subject: String,

    // Optional fields
    /// 事件資料內容類型
    pub datacontenttype: Option<String>,
    /// 事件資料結構描述
    pub dataschema: Option<String>,
}

impl<T> CloudEvent<T> {
    pub fn new(id: String, source: String, type_: String, data: T) -> Self {
        Self {
            id,
            source,
            specversion: "1.0".to_string(),
            type_,
            time: Utc::now(),
            data,
            datacontenttype: None,
            dataschema: None,
            subject: "".to_string(),
        }
    }

    pub fn with_content_type(mut self, content_type: String) -> Self {
        self.datacontenttype = Some(content_type);
        self
    }

    pub fn with_schema(mut self, schema: String) -> Self {
        self.dataschema = Some(schema);
        self
    }

    pub fn with_subject(mut self, subject: String) -> Self {
        self.subject = subject;
        self
    }

    pub fn with_time(mut self, time: DateTime<Utc>) -> Self {
        self.time = time;
        self
    }
}
