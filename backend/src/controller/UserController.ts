import { Contorller } from "../abstract/Contorller";
import { Request, response, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/Student";
import { log } from "console";
require("dotenv").config();

export class UserController extends Contorller {
  protected service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    const response: resp<Array<DBResp<Student>> | undefined> = {
      code: 200,
      message: "",
      body: undefined,
    };

    try {
      const dbResp = await this.service.getAllStudents();
      if (dbResp && dbResp.length > 0) {
        response.body = dbResp;
        response.message = "Find success";
      } else {
        response.message = "No data found";
      }
      res.status(200).send(response);
    } catch (error) {
      response.code = 500;
      response.message = "Server error";
      res.status(500).send(response);
    }
  }

  public async insertOne(Request: Request, Response: Response) {
    const resp = await this.service.insertOne(Request.body);
    Response.status(resp.code).send(resp);
  }

  public async deleteById(Request: Request, Response: Response) {
    const resp = await this.service.deleteById(Request.query.id as string);
    Response.status(resp.code).send(resp);
  }
  
  public async deleteBySid(Request: Request, Response: Response) {
    const resp = await this.service.deleteBySid(Request.body.sid as string);
    Response.status(resp.code).send(resp);
  }

  public async updateNameByID(Request: Request, Response: Response) {
    const resp = await this.service.updateNameByID(
      Request.body.id,
      Request.body.name
    );
    Response.status(resp.code).send(resp);
  }

  public async updateAbsencesByName(Request: Request, Response: Response) {
    const resp = await this.service.updateAbsencesByName(
      Request.body.name,
      Request.body.absences
    );
    Response.status(resp.code).send(resp);
  }
}
