import { Container } from 'inversify';
import { HealthController } from '../src/controllers/health';
import TYPES from './types';

const container = new Container();

// controllers
container.bind<HealthController>(TYPES.HealthController).to(HealthController).inSingletonScope();

export default container;