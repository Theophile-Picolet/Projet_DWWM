// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      auth: {
        name: string;
        isAdmin: boolean;
      };
      //
      user: {
        role: string;
        id: number;
        email: string;
      };
      /* ************************************************************************* */
    }
  }
}
