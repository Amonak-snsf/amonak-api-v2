import { Injectable, Inject } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { sendNotificationDTO } from "./notification.dto";

@Injectable()
export class NotificationService {

  // Méthode pour envoyer une notification push via FCM
  async sendPush(notificationPayload: { title: string; body: string; token: string }) {
    const message = {
      notification: {
        title: notificationPayload.title,
        body: notificationPayload.body,
      },
      token: notificationPayload.token,
    };

    try {
      // Envoi de la notification via FCM
      const response = await firebase.messaging().send(message);
      console.log('Notification envoyée avec succès:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
      throw new Error('Erreur lors de l\'envoi de la notification');
    }
  }

      }