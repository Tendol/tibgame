import React from 'react';
import { shallow, mount } from 'enzyme';
import Board from "./Board"

import { sampleWords } from '../setupTests';
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';
import { act } from 'react-dom/test-utils';

describe("Board PropTypes", () =>{
  test("Has Proptypes defined", () => {
    expect(Board).toHaveProperty('propTypes');
  });
});

describe('Board initialization', () => {
  let board;
  beforeEach(() => {
    board = mount(
      <Board
        words={sampleWords}
      />
    );
  });
  test('Handles current word properly', () => {
    const clas = board.find(".current-word")
    expect(clas.text()).toBe("བསྟན་")
  });

  test("Handles correct input correctly", () =>{
    const onSearchMock = jest.fn();
    act(() => {
      board.find('input').at(0).prop("onChange")({target: {name:"inputValue", value:"བསྟན་"}});
      board.update()
      console.log(board.find('input').at(0).debug())
    });
  });
});
