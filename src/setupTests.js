/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

export const sampleWords = ["བསྟན་","སོྲ"] 