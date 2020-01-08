import { Note } from '../entity/Note';
import { DeleteResult, getConnection, InsertResult } from 'typeorm';
import { injectable } from 'inversify';

@injectable()
export class NoteRepository {

    private readonly connection;

    constructor() {
        this.connection = getConnection();
    }

    async add(note: any): Promise<Note> {
        return this.connection
            .createQueryBuilder()
            .insert()
            .into(Note)
            .values(note)
            .output(["id", "title", "body"])
            .execute()
            .then((value: InsertResult) => {
                return value.generatedMaps[0]
            });

    }

    async getAll(): Promise<Note[]> {
        return this.connection
            .createQueryBuilder()
            .select("note")
            .from(Note, "note")
            .getMany();
    }

    async getById(id: string): Promise<Note> {
        return this.connection
            .getRepository(Note)
            .createQueryBuilder()
            .where({ id: id })
            .getOne()
    }

    async delete(id: string): Promise<number> {
        return this.connection
            .createQueryBuilder()
            .delete()
            .from(Note)
            .where({ id: id })
            .execute()
            .then((res: DeleteResult) => res.affected)
            .catch((reason:any) => {
                throw Error(reason)
            })
    }
}