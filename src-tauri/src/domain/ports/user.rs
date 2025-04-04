use anyhow::Error;

pub trait SetUserNamePort: Send + Sync {
    fn set_user_name(&self, name: String) -> Result<(), Error>;
}

pub trait GetUserNamePort: Send + Sync {
    fn get_user_name(&self) -> Result<(), Error>;
}

