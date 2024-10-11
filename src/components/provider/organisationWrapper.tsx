import React, { createContext, useContext } from 'react'

type Props = {
    children: React.ReactNode

}


const organisationContext = createContext({})



export const useOrganisation = () => {
    const context = useContext(organisationContext)
    return context
}


export const getOrganisation = () => {


}



const organisationWrapper = (props: Props) => {
    return (
        <organisationContext.Provider value={{}}>
            <div>
                {props.children}
            </div>
        </organisationContext.Provider>
    )
}

export default organisationWrapper


