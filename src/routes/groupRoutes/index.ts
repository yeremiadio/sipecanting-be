import { Router } from 'express';

import {
    createGroup, deleteGroupById, getGroupById, getGroups, updateGroupMembers
} from '@/controllers/groupController';

const groupRoutes = Router();

groupRoutes.post('/', createGroup);
groupRoutes.delete('/:id', deleteGroupById);
groupRoutes.put('/:id/members', updateGroupMembers);
groupRoutes.get('/', getGroups);
groupRoutes.get('/:id', getGroupById);

export default groupRoutes;
