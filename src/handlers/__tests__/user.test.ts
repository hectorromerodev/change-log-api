import { Request } from 'express';
import * as user from '../user';

describe('User Handler', () => {
    it('should create a new user', async () => {
        const req: Partial<Request> = {
            body: {   
                username: 'test1',
                password: 'test1'
            }
            
        }
        const res = {
            json({ token }: any) {
                expect(token).toBeTruthy();
            },
            status(status: number) {
                expect(status).toBe(201);
            }
        }

        await user.createUser(req as Request, res, () => {});
    });
});