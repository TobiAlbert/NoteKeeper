import { controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import TYPES from '../../config/types';
import { Request, Response } from 'express';
import { NoteRepository } from '../repositories/note';

@controller('/notes')
export class NotesController {

    public constructor(@inject(TYPES.NoteRepository) readonly noteRepo: NoteRepository) {
    }

    @httpGet('/')
    public async getAllNotes(_: Request, res: Response) {
        try {
            const notes = await this.noteRepo.getAll();
            return res.status(200).json({
                status: 'success',
                data: { notes }
            });
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }

    @httpPost('/')
    public async addNote(req: Request, res: Response) {
        try {
            const { title, body } = req.body;
            const note = { title, body };
            const savedNote = await this.noteRepo.add(note);

            return res.status(200).json({
                status: 'success',
                data: {
                    note: savedNote
                }
            });
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }

    @httpGet('/:id')
    public async getNote(req: Request, res: Response) {
        try {
            const note = await this.noteRepo.getById(req.params.id);

            if (note) {
                return res.status(200).json({
                    status: 'success',
                    data: {
                        note
                    }
                });
            } else {
                return res.status(404).json({
                    status: 'error',
                    message: 'No Resource Found.'
                });
            }
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }

    @httpDelete('/:id')
    public async delete(req: Request, res: Response) {
        try {
            const affected = await this.noteRepo.delete(req.params.id);

            const [code, message, status] =
                affected ? [200, 'Note Deleted', 'success'] : [404, 'No Resource Found', 'error'];

            return res.status(code).json({
                status,
                message
            });

        } catch (e) {
            return res.status(500).json({
                status: 'error',
                message: e.message
            });
        }
    }
}