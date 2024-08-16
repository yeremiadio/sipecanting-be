import { Request, Response } from 'express';
import { createGroup as createGroupService, updateGroupMembers as updateGroupMembersService, deleteGroupById as deleteGroupByIdService, getAllGroups, getGroupById as getGroupByIdService } from "@/services/groupService";
import { formatResponse } from '@/utils/formatResponse';
import { Group } from '@prisma/client';

export const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, userIds } = req.body;
        const group = await createGroupService(name, userIds);
        res.status(201).json(group);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed! Please try again." });
    }
}

export const updateGroupMembers = async (req: Request, res: Response) => {
    try {
        const { groupId, addUserIds, removeUserIds } = req.body;
        const group = await updateGroupMembersService(groupId, addUserIds, removeUserIds);
        res.status(201).json(group);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed! Please try again." });
    }
}

export const getGroups = async (_: Request, res: Response) => {
    try {
        const data = await getAllGroups();
        if (!data) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json(formatResponse<Group[]>({
            data: data,
            statusCode: res.statusCode,
            message: "Successfully fetched groups"
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const group = await getGroupByIdService(Number(id));
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: "Failed Please try again" });
    }
}

export const deleteGroupById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const group = await deleteGroupByIdService(Number(id));
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: "Failed Please try again" });
    }
}