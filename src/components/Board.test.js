import React from 'react';
import { shallow, mount } from 'enzyme';
import Board from "./Board"

import { sampleWords } from '../setupTests';
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';

describe("Board PropTypes", () =>{
  test("Has Proptypes defined", () => {
    expect(Board).toHaveProperty('propTypes');
  });
});

describe('Board initialization', () => {
  let board;
  beforeEach(() => {
    board = shallow(
      <Board
        words={sampleWords}
      />
    );
  });
  test('Handles current word properly', () => {
    console.log(board.debug())
    const clas = board.find(".current-word")
    expect(clas.text()).toBe("བསྟན་")
  });
});
