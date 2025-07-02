import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speakerList',
})
export class SpeakerListPipe implements PipeTransform {
  transform(parsedTranscription: any[]): string[] {
    if (!Array.isArray(parsedTranscription)) return [];
    const speakers = parsedTranscription
      .map((line) => line.speaker)
      .filter(Boolean);
    // Return unique speakers
    return Array.from(new Set(speakers));
  }
}
