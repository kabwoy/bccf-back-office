import {Dispatch, createContext} from 'react'
import { PageAction } from '../reducers/pageNumberReducer'

interface PageNumberContext{
    page:number
    action:Dispatch<PageAction>
}
const PageNumberContext = createContext<PageNumberContext>({} as PageNumberContext);

export default PageNumberContext;