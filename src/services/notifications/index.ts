import type { NotificationType } from '../../types/fiberion';

export type NotificationPayload = {
  type: NotificationType;
  recipient: string;
  subject: string;
  message: string;
};

export async function queueNotification(payload: NotificationPayload) {
  return {
    providerReady: false,
    providers: ['twilio', 'resend', 'sendgrid', 'postmark'],
    payload
  };
}
