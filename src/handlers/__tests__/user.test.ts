import { Request } from 'express';
import * as user from '../user';

describe('User Handler', () => {
    it('should create a new user', () => {
        const req: Partial<Request> = {
            body: {   
                username: 'test1',
                password: 'test1'
            }
            
        }
        const res = {
            json({ token }: any) {
                expect(token).toBeDefined();
            },
            status(status: number) {
                expect(status).toBe(201);
                return this;
            }
        }
        const next = (err: any) => {
            expect(err).toBeUndefined();
        }
        user.createUser(req as Request, res, next);
    });
});

