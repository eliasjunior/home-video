import React from 'react'
import Footer from '../Footer'
import {shallow} from 'enzyme'

describe('Footer', () => {
    it('should render the component', () => {
        shallow(<Footer/>)
    })
})
