# Export Persona Workflow - Validation Checklist

## Workflow Completion Checklist

### Persona Loading
- [ ] Persona document loaded successfully
- [ ] All sections parsed correctly
- [ ] Metadata extracted (name, version, dates)
- [ ] Export formats selected

### Export Configuration
- [ ] Options gathered for each selected format
- [ ] Configuration validated (valid options)
- [ ] Export output directory created/verified
- [ ] File naming convention applied

### Export Generation

#### JSON Export (if selected)
- [ ] Valid JSON structure generated
- [ ] All persona sections included
- [ ] Metadata complete
- [ ] Pretty print/minified as requested
- [ ] Research sources included (if opted)
- [ ] File saved successfully

#### CSV Export (if selected)
- [ ] Flattened structure created
- [ ] Header row correct
- [ ] All attributes as rows
- [ ] Delimiter applied correctly
- [ ] Awareness journey included (if opted)
- [ ] File saved successfully

#### PDF-Ready Export (if selected)
- [ ] Markdown optimized for PDF conversion
- [ ] Page breaks inserted appropriately
- [ ] Table of contents generated (if opted)
- [ ] Tables formatted for print
- [ ] Conversion instructions included
- [ ] File saved successfully

#### CRM Export (if selected)
- [ ] Target CRM format correct
- [ ] Custom fields mapped
- [ ] Contact/lead structure valid
- [ ] Tags generated
- [ ] Notes/description included
- [ ] File saved successfully

#### API Export (if selected)
- [ ] API schema version correct
- [ ] RESTful structure valid
- [ ] Hypermedia links included (if opted)
- [ ] Metadata complete
- [ ] ETag generated
- [ ] File saved successfully

#### Presentation Export (if selected)
- [ ] Slides structured correctly
- [ ] Slide count appropriate (not too many/few)
- [ ] Speaker notes included (if opted)
- [ ] Visual placeholders marked
- [ ] Content optimized for slides
- [ ] File saved successfully

#### Print-Friendly Export (if selected)
- [ ] Layout optimized for printing
- [ ] Font size appropriate
- [ ] Page breaks logical
- [ ] Tables fit page width
- [ ] Quick Reference version (if opted)
- [ ] File saved successfully

### Export Summary
- [ ] All requested formats generated
- [ ] Export summary report created
- [ ] File locations documented
- [ ] File sizes calculated
- [ ] Usage notes provided for each format

### User Guidance
- [ ] Format-specific usage instructions provided
- [ ] Conversion help available
- [ ] Import instructions clear (for CRM/CSV)
- [ ] Tool recommendations given
- [ ] Next steps communicated

## Quality Standards

### File Integrity
- [ ] All exported files are valid (not corrupted)
- [ ] File encoding is UTF-8 where applicable
- [ ] File sizes are reasonable (not bloated)
- [ ] File names follow convention

### Content Accuracy
- [ ] All persona data accurately exported
- [ ] No data loss in conversion
- [ ] No misattribution of attributes
- [ ] Metadata consistent across formats
- [ ] Version information correct

### Format Compliance
- [ ] JSON: Valid JSON schema, parseable
- [ ] CSV: Valid CSV format, importable
- [ ] PDF-Ready: Pandoc-compatible markdown
- [ ] CRM: Target CRM schema-compliant
- [ ] API: RESTful standards met
- [ ] Presentation: Slide software compatible
- [ ] Print: Optimized for physical printing

### Usability
- [ ] Exports are immediately usable
- [ ] No additional processing required (beyond standard conversion)
- [ ] Documentation sufficient for non-technical users
- [ ] Clear instructions for each format
- [ ] Troubleshooting guidance provided

## Format-Specific Validation

### JSON Validation
- [ ] Valid JSON syntax (no parse errors)
- [ ] Proper nesting and structure
- [ ] All required fields present
- [ ] Data types correct (strings, numbers, arrays, objects)
- [ ] No circular references

### CSV Validation
- [ ] Consistent column count per row
- [ ] Proper escaping of special characters
- [ ] Headers match data columns
- [ ] No malformed rows
- [ ] Importable to Excel/Google Sheets

### PDF-Ready Validation
- [ ] Successfully converts to PDF with Pandoc
- [ ] No layout issues in converted PDF
- [ ] TOC links functional (if included)
- [ ] Tables render correctly
- [ ] Page breaks in logical places

### CRM Validation
- [ ] Schema matches target CRM
- [ ] Required fields populated
- [ ] Field types correct
- [ ] Import-ready (no validation errors when importing)
- [ ] Tags/categories valid

### API Validation
- [ ] Schema version specified
- [ ] RESTful conventions followed
- [ ] Links URIs are valid format
- [ ] HTTP methods correctly indicated
- [ ] Status codes meaningful

### Presentation Validation
- [ ] Slide count reasonable (10-20 slides)
- [ ] Content per slide not overwhelming
- [ ] Speaker notes provide value
- [ ] Importable to presentation software
- [ ] Visual flow makes sense

### Print Validation
- [ ] Fits page width without horizontal scrolling
- [ ] Font size readable when printed
- [ ] Page breaks don't orphan content
- [ ] Headers/footers appropriate
- [ ] Quick Reference is 1-2 pages

## Success Criteria

### Export Effectiveness
- [ ] All requested formats generated successfully
- [ ] User can immediately use exports
- [ ] No errors or warnings during export
- [ ] Export process completed in reasonable time
- [ ] File sizes appropriate for sharing/storage

### User Satisfaction
- [ ] User understands how to use each export
- [ ] Documentation answers user questions
- [ ] Conversion process clear (if needed)
- [ ] Import process clear (for CRM/CSV)
- [ ] User can share exports with team

### Technical Quality
- [ ] Exports are technically valid
- [ ] Data integrity maintained
- [ ] Format specifications followed
- [ ] Compatible with target systems/tools
- [ ] No data loss or corruption

---

**Validation Complete:** [ ] YES / [ ] NO

**Formats Exported:** {{formats_list}}
**Total Files:** {{file_count}}
**Export Date:** {{export_date}}
**Persona:** {{persona_name}} (v{{version}})

**Files Generated:**
{{#each exports_generated}}
- {{format}}: {{file_path}} ({{file_size}})
{{/each}}

**Notes:** {{validation_notes}}
