/**
 * @description DTO para la creación de eventos con soporte para múltiples horarios.
 * @author Mannix Manglani
 * @date 08/02/2024
 * @export
 * @class CreateEventDto
 */
export class CreateEventDto {
  name: string;
  description: string;
  organizer: string;
  eventSchedule?: {
    startDate: Date;
    endDate: Date;
    repeatFrequency?: string;
    byDay?: string[];
    exceptDate?: Date[];
  }[];
}
