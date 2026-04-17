import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('user-queue')
export class UserProcessor extends WorkerHost {
  async process(job: Job): Promise<any> {
    switch (job.name) {
      case 'send-welcome-email':
        console.log(`Processing job: ${job.name} for user: ${job.data.email}`);
        await this.handleWelcomeEmail(job.data);
        break;

      default:
        console.log(`Unknown job name: ${job.name}`);
    }
  }

  private async handleWelcomeEmail(data: { email: string; userId: number }) {
    console.log(`Starting background task for user: ${data.email}...`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`Welcome email successfully sent to ${data.email}`);
  }
}
