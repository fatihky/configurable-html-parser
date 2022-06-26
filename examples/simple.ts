import { load } from 'cheerio';
import { readFileSync } from 'fs';
import { extract } from '../src';
import { ConfigFactory } from '../src/config';

const html = readFileSync('examples/simple.html').toString();
const config = ConfigFactory.fromYAML(readFileSync('examples/simple.yaml').toString());
const $ = load(html);

console.log('Simple parse result:', extract($, config));
