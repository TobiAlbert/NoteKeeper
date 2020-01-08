import { Container } from 'inversify';
import { HealthController } from '../src/controllers/health';
import TYPES from './types';
import { NoteRepository } from '../src/repositories/note';
import { NotesController } from '../src/controllers/notes';

const container = new Container();

// controllers
container.bind<HealthController>(TYPES.HealthController).to(HealthController).inSingletonScope();
container.bind<NotesController>(TYPES.NoteController).to(NotesController).inSingletonScope();

// repositories
container.bind<NoteRepository>(TYPES.NoteRepository).to(NoteRepository).inSingletonScope();

export default container;