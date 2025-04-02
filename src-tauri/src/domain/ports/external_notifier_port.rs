use crate::domain::models::events::Event;

pub trait ExternalNotifierPort {
    fn notify_new_user(&self, event: Event);
    fn notify_boss_coming(&self, event: Event);
    fn notify_new_message(&self, event: Event);
}