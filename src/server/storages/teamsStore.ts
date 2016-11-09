import "sequelize";
import { Team } from '../../lib/model';
import database from "../database/database";

export function getAll(): Promise<Team[]> {
    return database.teams.findAll() as any;
}

export function getById(id: number): Promise<Team> {
    return database.teams.findById(id) as any;
}

export function create(team: Team): Promise<Team> {
    team.id = null;
    return database.teams.create(team) as any;
}

export function getByAttr(attr: string, value: string): Promise<Team> {
    return database.teams.findOne({where: {attr: value}}) as any;
}

export function removeById(id: number): Promise<void> {
    return database.teams.destroy({
        where: {
            id: id
        }
    }) as any;
}