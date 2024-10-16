'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { useOrganizationList, useOrganization } from '@clerk/clerk-react';

export const userMembershipsParams = {
    memberships: {
        pageSize: 5,
        keepPreviousData: true,
    },
}

const OrganizationContext = createContext<{ activeOrgId: string | null; setActiveOrgId: React.Dispatch<React.SetStateAction<string | null>> } | null>(null);

const OrganizationProvider = ({ children }: { children: React.ReactNode }) => {
    const { userMemberships, setActive } = useOrganizationList(
        { userMemberships: userMembershipsParams }
    );
    const { organization } = useOrganization(); // This will provide the active organization
    const [activeOrgId, setActiveOrgId] = useState<string | null>(null);

    useEffect(() => {
        const setFirstOrgAsActive = async () => {
            if (!organization && userMemberships.data && setActive) {
                // Als er geen actieve organisatie is, stel de eerste uit de lijst als actief in
                await setActive({ organization: userMemberships.data[0].id });
                setActiveOrgId(userMemberships.data[0].id); // activeOrgId updaten
                console.log(userMemberships.data[0]);
                return userMemberships.data[0]
            } else if (organization) {
                setActiveOrgId(organization.id); // activeOrgId updaten als organisatie bestaat
                console.log(organization);
            }
        };

        setFirstOrgAsActive();
    }, [organization, userMemberships, setActive]);

    return (
        <OrganizationContext.Provider value={{ activeOrgId, setActiveOrgId }}>
            {children}
        </OrganizationContext.Provider>
    );
};

// Hook to use the organization context
export const useOrganizationContext = () => {
    const context = useContext(OrganizationContext);
    if (!context) {
        throw new Error('useOrganizationContext must be used within an OrganizationProvider');
    }
    return context;
};

export default OrganizationProvider;
