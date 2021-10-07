'use strict'

const Handlebars = require('handlebars')
const moment = require('moment')

const cols = {
    d: 'date',
    n: 'name',
    s: 'summary',
    b: 'text',
    t: 'tags'
}

const e1 = { d: '2008-08-21 13:26:42', n: 'something',    s: '', b: '', t: [] }
const e2 = { d: '2010-05-21 13:26:42', n: 'one more',     s: '', b: '', t: [] }
const e3 = { d: '2007-11-21 13:26:42', n: 'a photo',      s: '', b: '', t: ['photos', 'germany'] }
const e4 = { d: '2017-04-21 13:26:42', n: 'did this',     s: '', b: '', t: ['cv', 'univ', 'wisc'] }
const e5 = { d: '2006-03-21 13:26:42', n: 'nuther photo', s: '', b: '', t: ['photos', 'france'] }
const e6 = { d: '2008-10-21 13:26:42', n: 'un otra',      s: '', b: '', t: [] }
const e7 = { d: '2011-09-21 13:26:42', n: 'casera',       s: '', b: '', t: ['recipe', 'potatoes', 'milk'] }
const e8 = { d: '2008-01-07 13:26:42', n: 'January st',   s: '', b: '', t: ['trip'] }
const e9 = { d: '2008-01-05 13:26:42', n: 'Jan too',      s: '', b: '', t: ['home'] }
const entries = [ e1, e2, e3, e4, e5, e6, e7, e8, e9 ]

const groupBy = function(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        const keys = obj[property]

        keys.forEach(key => {
            if (!acc[key]) {
                acc[key] = []
            }
    
            acc[key].push(obj)
        })

        return acc

    }, {})
}

// const groupedEntries = groupBy(
//     entries.sort((a, b) => { return a.tag < b.tag ? -1 : 1 }), 't'
// )
//console.log(groupedEntries)

const templates = {
    entry: `
name: {{n}}
date: {{d}}
---------------------------
summary: {{s}}
text: {{b}}
---------------------------
tags: {{#t}}[{{.}}] {{/t}}`,

    entriesByDates: `
{{#entriesByDates}}
{{year}}:
{{#months}}
- {{monthAlpha}}
    {{#entries}}
    name: {{n}}
    date: {{d}}
    tags: {{#t}}[{{.}}] {{/t}}
    --------------------------
    {{/entries}}
==============================
{{/months}}
{{/entriesByDates}}`,

    entriesByTags: `
{{#entriesByTags}}
{{tag}}:
    {{#entries}}
    name: {{n}}
    date: {{d}}
    tags: {{#t}}[{{.}}] {{/t}}
    --------------------------
    {{/entries}}
==============================
{{/entriesByTags}}`
}

const compileTemplates = (templates) => {
    const compiledTemplates = {}

    for (let t in templates) {
        compiledTemplates[t] = Handlebars.compile(templates[t])
    }

    return compiledTemplates
}

const writeEntry = (entry, compiledTemplates) => {
    console.log(compiledTemplates.entry(entry))
}

const writeEntries = (entries, compiledTemplates) => {
    entries.forEach(entry => {
        console.log(compiledTemplates.entry(entry))
    })
}

const writeEntriesByDate = (entriesByDates, compiledTemplates) => {
    console.log(compiledTemplates.entriesByDates(entriesByDates))
}

const writeEntriesByTags = (entriesByTags, compiledTemplates) => {
    console.log(compiledTemplates.entriesByTags(entriesByTags))
}

const makeEntriesByTags = (entries) => {
    const entriesByTags = []
    const tmp = groupBy(
        entries, 't'
    )

    for (let tag in tmp) {
        entriesByTags.push({
            tag: tag,
            entries: tmp[tag]
        })
    }

    entriesByTags.sort((a, b) => { return a.tag < b.tag ? -1 : 1 })

    return { entriesByTags: entriesByTags }
}

const makeEntriesByDates = (entries) => {
    const entriesByDates = []

    entries.forEach(e => {
        const entryDate = new Date(e.d)
        const entryYear = entryDate.getFullYear()
        const entryMonthAlpha = entryDate.toLocaleDateString('en-US', {month: 'long'})
        const entryMonthNumeric = entryDate.getMonth()

        // check if year already exists in collection
        const indexOfYear = entriesByDates.map(e => { return e.year }).indexOf(entryYear)

        // year exists
        if (indexOfYear > -1) {

            // check if month already exists
            const indexOfMonth = entriesByDates[indexOfYear]
                .months.map(e => { return e.monthAlpha }).indexOf(entryMonthAlpha)

            // month exists
            if (indexOfMonth > -1) {
                if (entriesByDates[indexOfYear].months[indexOfMonth].entries.length) {
                    entriesByDates[indexOfYear].months[indexOfMonth].entries.push(e)
                }
                else {
                    entriesByDates[indexOfYear].months[indexOfMonth].entries = [e]
                }
            }

            // month doesn't exist
            else {
                entriesByDates[indexOfYear].months.push({
                    monthAlpha: entryMonthAlpha,
                    monthNumeric: entryMonthNumeric,
                    entries: [e]
                })
            }
        }

        // year doesn't exist
        else {
            entriesByDates.push({
                year: entryYear,
                months: [{
                    monthAlpha: entryMonthAlpha,
                    monthNumeric: entryMonthNumeric,
                    entries: [e]
                }]
            })
        }
    })

    entriesByDates.forEach(y => {
        const entriesByMonths = y.months
        entriesByMonths.forEach(m => {
            const entries = m.entries
            entries.sort((a, b) => { return a.name < b.name ? -1 : 1 })
        })

        entriesByMonths.sort((a, b) => { return a.monthNumeric < b.monthNumeric ? -1 : 1 })
    })

    return { 
        entriesByDates: entriesByDates.sort((a, b) => { return a.tag < b.tag ? -1 : 1 }) 
    }
}

const compiledTemplates = compileTemplates(templates)

writeEntry(entries[3], compiledTemplates)
// writeEntries(entries, compiledTemplates)

// const entriesByDates = makeEntriesByDates(entries)
// writeEntriesByDate(entriesByDates, compiledTemplates)

// const entriesByTags = makeEntriesByTags(entries)
// writeEntriesByTags(entriesByTags, compiledTemplates)