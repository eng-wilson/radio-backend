import { httpServer } from './http';
import './websocket';

httpServer.listen(3333, () => 'Server is running on PORT 3333');
