import React, { useState } from 'react'
import inputStyle from './findInputStyle'
import { MentionsInput, Mention } from 'react-mentions'
import { searchPeople } from '@/handlers/api/people.handler';
import mentionStyle from './findMentionStyle';
import { getPersonDisplayName } from '@/helpers/person.helper';

interface FindInputProps {
  onSearch: (query: string) => void;
  value: string;
  onChange: (value: string) => void;
}

const MENTION_MARKUP = '@[__display__](__id__)';

export default function FindInput({ onSearch, value, onChange }: FindInputProps) {

  const handleSearchPeople = async (e: any, callback: any) => {
    if (!e.length) return [];
    return searchPeople(e).then((people) => people.map((person: any) => ({
      id: person.id,
      display: getPersonDisplayName(person),
    }))).then((people) => callback(people));
  }

  return (
    <MentionsInput
      value={value}
      singleLine={true}
      placeholder='Search for photos, use @ to search for people'
      style={inputStyle}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearch(value);
        }
      }}
      onChange={(e) => onChange(e.target.value)}>
      <Mention
        trigger="@"
        style={mentionStyle}
        markup={MENTION_MARKUP}
        displayTransform={(id, display) => display || id}
        data={handleSearchPeople}
        renderSuggestion={(
          suggestion,
          _search,
          highlightedDisplay,
          _index,
          focused
        ) => (
          <div className={`user ${focused ? 'focused' : ''} `}>
            {highlightedDisplay || suggestion.display}
          </div>
        )}
      />
    </MentionsInput>
  )
}
