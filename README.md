# Configurable HTML to JSON converter
This tool aims to let you convert your HTMLs to structured JSONs.  
  
## API
Using this module is as simple as:  
  
```ts
import { ConfigFactory, extract } from 'configurable-html-parser';

const yaml = '...';
const html = '...';
const config = ConfigFactory.fromYAML(yaml);
const result = extract(html, config);
```
  
### `extract($: cheerio.Root | string, config: Config): any`
You may pass either `cheerio.Root` or `string` (html contents) to `extract` function.  
If you wish, you can use the same `cheerio.Root` for multiple configs without need to  
call `load(html)` again and again.  
  
## Configuration
* `selector` is **required** in all configurations except `union` and `constant` configurations and **must** not be empty.  
* `type` can be `string`, `object` and `array` **explicitly**.
* `type` might become `number`, `boolean`, `object` and `array` **implicitly** by the `transform` parameter.
* `transform` can be either:
  - name of one of the core transformers. see `Core Transformers` section below.
  - [not available for YAML] an instance of a class that extends `Transformer` class.
  - array of above
* `properties: { [key: string]: Config }` implicitly sets `type` to `object`.
* `items: Config` defines the configuration that will be used to extract data for every match of the selector.
* `union: ConfigWithSelector[]` extracts data for the first matching configuration only. Extracts `null` if
  none of the given configurations match. Can't be used with any other properties.
* `constant: any` always extracts the provided value. Can't be used with any other properties.

## Selectors
[cheerio](https://npmjs.com/package/cheerio) is used for matching elements so the format you provided MUST be valid for cheerio. Except the **special selectors**.

### Special Selectors
* **$self**
Passes the same element down to the extraction process.  

## Core Transformers
1. **length**:
  Input type: `string | array`
  Output type: `number`

2. **trim**:
  Input type: `string`
  Output type: `string`

3. **exists**:
  Input type: `$`
  Output type: `number`

4. **match-count**:
  Input type: `$`
  Output type: `string`
  Returns matched element count of your selector.

5. **exists**:
  Input type: `$`
  Output type: `boolean`

6. **html**:
  Input type: `$`
  Output type: `string`
