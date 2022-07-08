import { httpServer } from './http';
import './websocket';

const PORT = process.env.PORT || 3333;

httpServer.listen(PORT, () => 'Server is running on PORT 3333');
