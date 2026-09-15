export async function sendAlertWebhook(webhookUrl: string, payload: {
  title: string;
  description: string;
  monitorName: string;
  status: 'down' | 'recovered' | 'warning';
  timestamp: string;
}): Promise<boolean> {
  if (!webhookUrl) return false;

  try {
    const isDiscord = webhookUrl.includes('discord.com');
    const isSlack = webhookUrl.includes('slack.com');

    let body: any;

    if (isDiscord) {
      const color = payload.status === 'down' ? 15158332 : (payload.status === 'recovered' ? 3066993 : 15844367);
      body = {
        embeds: [
          {
            title: payload.title,
            description: payload.description,
            color,
            fields: [
              { name: 'Monitor', value: payload.monitorName, inline: true },
              { name: 'Status', value: payload.status.toUpperCase(), inline: true },
              { name: 'Time', value: payload.timestamp, inline: true }
            ],
            footer: { text: 'PulseGuard Automated Alert' }
          }
        ]
      };
    } else if (isSlack) {
      body = {
        text: `*${payload.title}*\n${payload.description}\n*Monitor:* ${payload.monitorName} | *Status:* ${payload.status.toUpperCase()}`
      };
    } else {
      // Standard generic JSON webhook
      body = payload;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000)
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to dispatch alert webhook:', error);
    return false;
  }
}
