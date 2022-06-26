import { load } from 'cheerio';
import { readFileSync } from 'fs';
import { ConfigFactory, extract } from '../src';

const config = ConfigFactory.fromYAML(readFileSync('examples/serp.yaml').toString());
const $1 = load(readFileSync('examples/serp-1.html').toString());

console.log('result for serp-1.html:', extract($1, config));
