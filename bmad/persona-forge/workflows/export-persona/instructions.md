# Export Persona - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/bmad/persona-forge/workflows/export-persona/workflow.yaml</critical>
<critical>Communicate in {communication_language} throughout the export process</critical>

<workflow>

<step n="1" goal="Load persona and select export formats">
<action>Welcome {user_name} to the Persona Export workflow</action>

<action>Explain the export workflow:
This workflow exports persona documents to multiple formats for different use cases:

**Available Export Formats:**

1. **JSON** - Structured data for applications and integrations
2. **CSV** - Spreadsheet format for Excel/Google Sheets analysis
3. **PDF-Ready Markdown** - Optimized formatting for PDF conversion
4. **CRM Format** - Salesforce/HubSpot compatible structure
5. **API Format** - REST API-ready JSON with standardized schema
6. **Presentation Format** - Slide-friendly summary version
7. **Print-Friendly** - Formatted for printing (single-page quick ref + full doc)

You can export to multiple formats in one run.
</action>

<ask response="persona_file_path">Which persona document would you like to export? (Provide the file path)</ask>

<action>Load persona document from provided path</action>

<action>Parse persona and extract all sections:
- Metadata (name, version, dates)
- Quick Reference
- Demographics
- Psychographics
- Pain Points
- Goals
- Awareness Journey (all 5 levels)
- Practical Tools
- Research Validation
</action>

<action>Display persona summary:
**Persona:** {{persona_name}}
**Version:** {{version}}
**Last Updated:** {{last_updated}}
**Sections:** {{section_count}} sections parsed
</action>

<ask>Which export format(s) would you like? (Select multiple if desired)

1. **JSON** - Structured data format [json]
2. **CSV** - Spreadsheet format [csv]
3. **PDF-Ready Markdown** - For PDF conversion [pdf]
4. **CRM Format** - Salesforce/HubSpot [crm]
5. **API Format** - REST API ready [api]
6. **Presentation** - Slide-friendly summary [presentation]
7. **Print-Friendly** - Optimized for printing [print]
8. **All Formats** - Export everything [all]

Enter your selection (comma-separated if multiple): [e.g., "json,csv,pdf" or "all"]
</ask>

<action>Store export_formats as array</action>

<check if="export_formats includes 'all'">
  <action>Set export_formats to all available formats</action>
</check>

<template-output>persona_loaded, export_formats_selected</template-output>
</step>

<step n="2" goal="Configure export options">

<action>For each selected format, gather configuration options:</action>

<check if="export_formats includes 'json'">
  <ask>JSON Export Options:
  - Include all metadata? [y/n] (default: y)
  - Pretty print (readable) or minified (compact)? [pretty/minified] (default: pretty)
  - Include research sources? [y/n] (default: y)
  </ask>
  <action>Store json_options</action>
</check>

<check if="export_formats includes 'csv'">
  <ask>CSV Export Options:
  - Include awareness journey details? [y/n] (default: y)
  - Delimiter: [comma/tab/semicolon] (default: comma)
  - Include practical tools? [y/n] (default: n - too large for spreadsheet)
  </ask>
  <action>Store csv_options</action>
</check>

<check if="export_formats includes 'pdf'">
  <ask>PDF-Ready Export Options:
  - Include table of contents? [y/n] (default: y)
  - Page break locations: [sections/awareness-levels/auto] (default: sections)
  - Include images/visual elements? [y/n] (default: y)
  </ask>
  <action>Store pdf_options</action>
</check>

<check if="export_formats includes 'crm'">
  <ask>CRM Export Options:
  - Target CRM: [salesforce/hubspot/generic] (default: generic)
  - Include custom fields? [y/n] (default: y)
  - Export format: [json/xml] (default: json)
  </ask>
  <action>Store crm_options</action>
</check>

<check if="export_formats includes 'api'">
  <ask>API Export Options:
  - API version: [v1/v2] (default: v2)
  - Include hypermedia links? [y/n] (default: y)
  - Authentication metadata? [y/n] (default: n)
  </ask>
  <action>Store api_options</action>
</check>

<check if="export_formats includes 'presentation'">
  <ask>Presentation Export Options:
  - Slides per awareness level: [1/2/3] (default: 2)
  - Include speaker notes? [y/n] (default: y)
  - Format: [markdown/plain] (default: markdown)
  </ask>
  <action>Store presentation_options</action>
</check>

<check if="export_formats includes 'print'">
  <ask>Print-Friendly Export Options:
  - Paper size: [letter/a4] (default: letter)
  - Font size: [normal/large] (default: normal)
  - Include full document or quick ref only? [full/quick] (default: full)
  </ask>
  <action>Store print_options</action>
</check>

<template-output>export_options_configured</template-output>
</step>

<step n="3" goal="Generate exports">

<action>Create export output directory if needed: {export_output_folder}</action>

<check if="export_formats includes 'json'">
  <action>Generate JSON export:

  Structure:
  ```json
  {
    "persona": {
      "metadata": {
        "name": "...",
        "version": "...",
        "created": "...",
        "lastUpdated": "...",
        "businessContext": "..."
      },
      "quickReference": {
        "description": "...",
        "demographics": {...},
        "topPainPoints": [...],
        "topGoals": [...],
        "emotionalDrivers": "...",
        "qualificationQuestions": [...]
      },
      "coreProfile": {
        "demographics": {...},
        "psychographics": {...},
        "painPoints": [...],
        "goals": [...],
        "emotionalDrivers": {...}
      },
      "awarenessJourney": {
        "unaware": {...},
        "problemAware": {...},
        "solutionAware": {...},
        "productAware": {...},
        "mostAware": {...}
      },
      "practicalTools": {
        "qualificationQuestions": [...],
        "messagingExamples": {...},
        "emailTemplates": {...},
        "salesScripts": {...},
        "objectionHandling": {...},
        "campaignTemplates": {...},
        "contentIdeas": {...}
      },
      "researchValidation": {
        "sources": [...],
        "confidenceLevel": "...",
        "lastResearchDate": "...",
        "analystNotes": "..."
      }
    }
  }
  ```

  Apply options from json_options (pretty print, include metadata, etc.)
  </action>

  <action>Save JSON to: {export_output_folder}/{{persona_name_slug}}-{{date}}.json</action>
  <action>Add to exports_generated list</action>
</check>

<check if="export_formats includes 'csv'">
  <action>Generate CSV export:

  Create flattened CSV with rows for different aspects:

  Header Row:
  Section, Attribute, Value, Details, AwarenessLevel

  Data Rows:
  - Demographics rows (Age, Income, Location, etc.)
  - Psychographics rows (Values, Lifestyle, Personality, etc.)
  - Pain Points rows (one per pain point)
  - Goals rows (one per goal)
  - Awareness Journey rows (one per level with key attributes)
  - Optional: Practical Tools rows (if included in options)

  Apply options from csv_options (delimiter, include awareness, etc.)
  </action>

  <action>Save CSV to: {export_output_folder}/{{persona_name_slug}}-{{date}}.csv</action>
  <action>Add to exports_generated list</action>
</check>

<check if="export_formats includes 'pdf'">
  <action>Generate PDF-Ready Markdown:

  Optimize formatting for PDF conversion:
  - Add explicit page breaks
  - Optimize table formatting
  - Include table of contents with links
  - Add headers/footers markers
  - Optimize image sizing
  - Remove elements that don't render well in PDF
  - Ensure proper heading hierarchy

  Apply options from pdf_options (TOC, page breaks, images, etc.)
  </action>

  <action>Save PDF-Ready MD to: {export_output_folder}/{{persona_name_slug}}-pdf-ready-{{date}}.md</action>
  <action>Add conversion instructions comment at top of file</action>
  <action>Add to exports_generated list</action>
</check>

<check if="export_formats includes 'crm'">
  <action>Generate CRM-compatible export:

  Generic CRM Structure:
  {
    "contact": {
      "firstName": "{{persona_name}}",
      "lastName": "(Persona)",
      "title": "{{occupation}}",
      "company": "{{business_context}}",
      "industry": "{{industry}}",
      "customFields": {
        "persona_type": "{{persona_name}}",
        "age_range": "{{age_range}}",
        "income_range": "{{income_range}}",
        "top_pain_points": "{{pain_points_comma_separated}}",
        "top_goals": "{{goals_comma_separated}}",
        "awareness_indicators": {
          "unaware": "{{unaware_indicators}}",
          "problem_aware": "{{problem_aware_indicators}}",
          "solution_aware": "{{solution_aware_indicators}}",
          "product_aware": "{{product_aware_indicators}}",
          "most_aware": "{{most_aware_indicators}}"
        },
        "qualification_questions": "{{qualification_questions_formatted}}",
        "messaging_notes": "{{messaging_summary}}"
      }
    },
    "tags": ["Persona", "{{persona_name}}", "{{industry}}", ...],
    "notes": "{{persona_description_summary}}"
  }

  For Salesforce: Map to Salesforce object structure
  For HubSpot: Map to HubSpot contact properties
  For Generic: Use standardized field names

  Apply options from crm_options (target CRM, custom fields, format)
  </action>

  <action>Save CRM export to: {export_output_folder}/{{persona_name_slug}}-crm-{{date}}.{{format}}</action>
  <action>Add to exports_generated list</action>
</check>

<check if="export_formats includes 'api'">
  <action>Generate API-ready format:

  REST API V2 Structure:
  {
    "apiVersion": "v2",
    "kind": "Persona",
    "metadata": {
      "id": "{{persona_id}}",
      "name": "{{persona_name}}",
      "version": "{{version}}",
      "created": "{{iso_date}}",
      "updated": "{{iso_date}}",
      "etag": "{{hash}}"
    },
    "spec": {
      "demographics": {...},
      "psychographics": {...},
      "painPoints": [...],
      "goals": [...],
      "awarenessJourney": {...},
      "practicalTools": {...}
    },
    "status": {
      "health": "{{health_score}}",
      "lastValidated": "{{validation_date}}",
      "confidenceLevel": "{{confidence}}"
    },
    "_links": {
      "self": {"href": "/api/v2/personas/{{persona_id}}"},
      "update": {"href": "/api/v2/personas/{{persona_id}}", "method": "PUT"},
      "validate": {"href": "/api/v2/personas/{{persona_id}}/validate", "method": "POST"},
      "compare": {"href": "/api/v2/personas/compare?ids={{persona_id}}", "method": "GET"}
    }
  }

  Apply options from api_options (API version, hypermedia, auth metadata)
  </action>

  <action>Save API format to: {export_output_folder}/{{persona_name_slug}}-api-{{date}}.json</action>
  <action>Add to exports_generated list</action>
</check>

<check if="export_formats includes 'presentation'">
  <action>Generate Presentation format:

  Structure optimized for slides:

  **Slide 1: Title Slide**
  - Persona name
  - One-line description
  - Visual indicator (icon/color)

  **Slide 2: Quick Profile**
  - Demographics snapshot (4-5 key attributes)
  - Visual: Photo or illustration placeholder

  **Slide 3: Pain Points & Goals**
  - Top 3 pain points
  - Top 3 goals
  - Visual: Simple icons or graphics

  **Slides 4-13: Awareness Journey** (2 slides per level)
  - Level overview + behavior
  - Messaging + channels

  **Slide 14: Qualification**
  - Key qualification questions
  - Persona indicators

  **Slide 15: Action Items**
  - How to use this persona
  - Key takeaways

  Include speaker notes for each slide with additional context

  Apply options from presentation_options (slides per level, speaker notes, format)
  </action>

  <action>Save Presentation to: {export_output_folder}/{{persona_name_slug}}-presentation-{{date}}.md</action>
  <action>Add to exports_generated list</action>
</check>

<check if="export_formats includes 'print'">
  <action>Generate Print-Friendly format:

  Optimized for printing:
  - Single column layout
  - Increased font sizes (if large option selected)
  - Page break indicators
  - Header/footer margins
  - Optimized table widths
  - Printer-friendly colors (no dark backgrounds)

  Two versions:
  1. Quick Reference (1-2 pages) - Essential info only
  2. Full Document (if selected) - Complete persona with print optimization

  Apply options from print_options (paper size, font size, full/quick)
  </action>

  <action>Save Print-Friendly to: {export_output_folder}/{{persona_name_slug}}-print-{{date}}.md</action>
  <action>Add to exports_generated list</action>
</check>

<action>Generate export summary report:
- List of all generated exports
- File locations
- File sizes
- Format-specific usage notes
</action>

<template-output>exports_generated</template-output>
</step>

<step n="4" goal="Present exports and provide usage guidance">

<action>Present export results to {user_name}</action>

<action>Display export summary:

**Exports Generated:** {{exports_count}}

{{#each exports_generated}}
**{{format_name}}:**
- **File:** {{file_path}}
- **Size:** {{file_size}}
- **Usage:** {{usage_notes}}
{{/each}}

**All exports saved to:** {export_output_folder}
</action>

<action>Provide format-specific usage guidance:</action>

<check if="json exported">
  **JSON Export Usage:**
  - Import into applications via file upload or API
  - Parse with JSON libraries in any programming language
  - Use for data analysis and transformations
  - Integrate with custom tools and dashboards
</check>

<check if="csv exported">
  **CSV Export Usage:**
  - Open in Excel, Google Sheets, or any spreadsheet tool
  - Filter and sort attributes
  - Create charts and visualizations
  - Combine with other data sources
  - Share with team members who prefer spreadsheets
</check>

<check if="pdf exported">
  **PDF-Ready Export Usage:**
  - Convert to PDF using:
    - Pandoc: `pandoc {{file_name}} -o output.pdf`
    - Online converters (dillinger.io, markdown-pdf.com)
    - VS Code extensions (Markdown PDF)
  - Resulting PDF suitable for:
    - Printing and distribution
    - Email attachments
    - Presentations
    - Archival
</check>

<check if="crm exported">
  **CRM Export Usage:**
  - **For Salesforce:**
    - Import via Data Import Wizard
    - Map custom fields to Salesforce objects
    - Create as Contact or Lead record

  - **For HubSpot:**
    - Import via Contacts > Import
    - Map properties to HubSpot fields
    - Use for segmentation and workflows

  - **For Generic CRM:**
    - Adapt field mappings to your CRM's structure
    - Use as reference for manual entry
    - Script automated imports
</check>

<check if="api exported">
  **API Export Usage:**
  - Use as response format for custom API
  - POST to create persona via API
  - Reference for API documentation
  - Schema validation examples
  - Hypermedia links show available operations
</check>

<check if="presentation exported">
  **Presentation Export Usage:**
  - Import into presentation software:
    - Google Slides (via Slides.md or copy-paste)
    - PowerPoint (via Markdown import or manual)
    - Keynote (copy-paste and format)
  - Use speaker notes for presentation delivery
  - Customize design and branding
  - Present to team, stakeholders, clients
</check>

<check if="print exported">
  **Print-Friendly Export Usage:**
  - Print directly from markdown viewer
  - Convert to PDF first for best results
  - Use Quick Reference for handouts
  - Use Full Document for detailed reference
  - Staple or bind for physical distribution
</check>

<ask>Would you like to:
1. **Export another persona** [export-another]
2. **Export same persona in additional formats** [more-formats]
3. **View a specific export** [view]
4. **Get format conversion help** [conversion-help]
5. **Complete and exit** [exit]
</ask>

<check if="export-another">
  <action>Return to Step 1 with new persona</action>
</check>

<check if="more-formats">
  <action>Return to Step 1 with same persona, new format selection</action>
</check>

<check if="view">
  <ask>Which export would you like to view? [provide file name]</ask>
  <action>Display contents of selected export</action>
</check>

<check if="conversion-help">
  <action>Provide detailed conversion instructions:

  **Converting Markdown to PDF:**

  Method 1: Pandoc (Recommended)
  ```bash
  pandoc input.md -o output.pdf --pdf-engine=xelatex -V geometry:margin=1in
  ```

  Method 2: Online Tools
  - https://www.markdowntopdf.com/
  - https://dillinger.io/ (export feature)

  Method 3: VS Code Extension
  - Install "Markdown PDF" extension
  - Right-click markdown file → "Markdown PDF: Export (pdf)"

  **Importing CSV to Excel:**
  - Open Excel → Data → From Text/CSV
  - Select exported CSV file
  - Configure delimiter and data types
  - Load data

  **Using JSON in Applications:**
  - Most programming languages have JSON parsers
  - Example (Python): `import json; data = json.load(open('file.json'))`
  - Example (JavaScript): `const data = require('./file.json')`

  **CRM Import Steps:**
  (Detailed step-by-step for Salesforce and HubSpot)
  </action>
</check>

<check if="exit">
  <action>Remind about export locations</action>
  <action>Encourage updating exports when persona is updated</action>
</check>

<template-output>completion_message</template-output>
</step>

</workflow>

## Export Format Specifications

### JSON Format
- Schema version: 2.0
- Encoding: UTF-8
- Structure: Nested objects for each persona section
- Arrays for lists (pain points, goals, questions)
- Metadata includes version, dates, confidence levels

### CSV Format
- Delimiter: Configurable (comma default)
- Encoding: UTF-8
- Header row: Section, Attribute, Value, Details, AwarenessLevel
- One row per attribute or list item
- Flattened structure for spreadsheet compatibility

### PDF-Ready Markdown
- Pandoc-compatible markdown syntax
- Explicit page breaks: `\newpage` or `<div style="page-break-after: always;"></div>`
- Table of contents: Auto-generated with links
- Optimized table widths for A4/Letter
- Print-safe colors and fonts

### CRM Format
- Generic: JSON with standardized contact fields
- Salesforce: Mapped to Contact/Lead object schema
- HubSpot: Mapped to Contact properties
- Custom fields for persona-specific attributes
- Tags for categorization and filtering

### API Format
- RESTful JSON structure
- Hypermedia links (HATEOAS)
- Standard HTTP methods indicated
- Versioned schema (v1, v2)
- ETags for caching
- Status indicators

### Presentation Format
- Slide markdown with separators (`---`)
- Speaker notes indicated (`> Note:` blocks)
- Optimized for 16:9 aspect ratio
- Bullet points limited to 3-5 per slide
- Visual placeholders for graphics

### Print-Friendly Format
- Single column, 12pt+ font
- Margins: 1 inch all sides
- Page breaks at section boundaries
- No dark backgrounds
- Tables optimized for print width
- Quick Reference: 1-2 pages max

