import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new User()).toBeTruthy();
  });
});
