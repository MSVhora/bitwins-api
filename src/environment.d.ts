import { Request, Response } from 'express';
declare namespace Environment {
   /**
    * Custom request that includes all the types of express Request Object
    */
   interface CustomRequest extends Request<any> {
      body: any;
      custom: any;
      user: any;
   }

   /**
    * Custom response that includes all the types of express Response Object
    */
   interface CustomResponse extends Response {
      body?: any;
   }

   /**
    * Pager
    */
   interface Pager {
      sortField: string;
      sortOrder: string;
      rowNumber: number;
      recordsPerPage: number;
      filteredRecords: number;
      totalRecords: number;
   }
}

export = Environment;
