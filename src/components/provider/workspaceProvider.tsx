'use client'
import { getWorkspace } from '@/actions/workspace/actions';
import { Workspace } from '@prisma/client';
import { redirect } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Context voor de werkruimte
const WorkspaceContext = createContext<Workspace | null>(null); // Typing toegevoegd

// Hook om de werkruimte op te halen
const useWorkspace = () => {
    const fetchWorkspace = async (workspaceId: string) => {
        const workspace = await getWorkspace(workspaceId);
        if (!workspace) { // Verbeterde controle
            redirect('/admin/'); // Geen return nodig bij redirect
        }
        return workspace;
    };

    return { fetchWorkspace };
};

type Params = {
    children: React.ReactNode;
    workspaceId: string;
}

export const WorkspaceProvider = ({ children, workspaceId }: Params) => {
    const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
    const { fetchWorkspace } = useWorkspace();

    useEffect(() => {
        const loadWorkspace = async () => {
            const workspace = await fetchWorkspace(workspaceId);
            if (workspace) { // Verbeterde controle
                setCurrentWorkspace(workspace);
            }
        };

        loadWorkspace();
    }, [workspaceId, fetchWorkspace]);

    // Controleer of currentWorkspace null is en redirect indien nodig
    if (!currentWorkspace) {
        return null; // Of een loading indicator
    }

    return (
        <WorkspaceContext.Provider value={currentWorkspace}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useCurrentWorkspace = () => {
    return useContext(WorkspaceContext);
};
