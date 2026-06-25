import { setupServer } from 'msw/node';

import { authHandlers } from './handlers/auth.handlers';
import { crewHandlers } from './handlers/crew.handlers';

export const server = setupServer(...crewHandlers, ...authHandlers);
