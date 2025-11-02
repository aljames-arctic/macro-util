export const multiattack = 
`Extract valid attack names and their quantities from a D&D Multiattack description. For each Multiattack, provide all possible unique attack sequences covering all options, with specific handling for conditional attacks. Use the following criteria for classification:

Prompt Instructions

    Sectioning by "Then": Treat the keyword "then" as a section delimiter. Each segment before and after a "then" should be parsed as a separate step in the multiattack sequence. Sequences within the same section must remain grouped together.

    Standard Actions: Identify core attack sets within each section and treat them as dependent on preceding sections being resolved.

    Additional Actions (Spells/Abilities): If a spell or ability (e.g., "Dominate Person") is specified as part of the attack sequence, integrate it directly into the sequence where applicable, regardless of its separate action nature.

    Replaceable Actions: Recognize actions that can substitute for others. Use phrases like "can replace one attack with" to include these in sequences as substitutions, without marking them as "Optional" unless specified conditions like "if able" are stated.

    Optional Actions: Mark actions as "Optional" only when context clues such as "if able" or "if" indicate they are conditional based on the situation.

    Sequence Formation: Provide all possible unique attack sequences considering additional and replaceable actions, maintaining clarity and precision in their inclusion.

    Include Specific Action Names: Utilize specific names of spells or unique abilities in the sequence (e.g., "Dominate Person"), rather than generic terms.

    Ranged Attacks: Mark actions as "Ranged" only when context clues such as "ranged attacks with" or "ranged attack with" indicate the attack is required to be done at range.

    Order Preservation: Ensure that sequences follow the order described, with no rearrangement of sections or actions within sections.

    Unique Sequences: Generate unique attack sequences per section and then combine them sequentially in the described order.

    Output Formatting: Reflect the separation of sections in the nested structure of the JSON. Each array corresponds to a "then"-separated section, and within each section, all unique sequences are represented.

Output Format
Provide output in the following JSON structure:

[
  [[attack_sequence_1], [attack_sequence_2], ...],
  [[attack_sequence_1], [attack_sequence_2], ...],
  ...
]`