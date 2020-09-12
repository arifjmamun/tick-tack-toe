import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BlankMove } from './BlankMove';

configure({ adapter: new Adapter() });

it('Should call a passed addSymbol callback when it is clicked', () => {
  const addMove = jest.fn();
  const wrapper = shallow(<BlankMove addMove={addMove} />);
  wrapper.simulate('click');
  expect(addMove.mock.calls.length).toBe(1);
});