// Plausible "real" documents shown when boss-key (Esc) is pressed.

export type Decoy = {
  title: string;
  body: { type: "h1" | "h2" | "p" | "li"; text: string }[];
};

export const DECOYS: Decoy[] = [
  {
    title: "Q2 Planning Notes",
    body: [
      { type: "h1", text: "Q2 Planning Notes" },
      { type: "p", text: "Met with the team this morning to outline our priorities for the second quarter. Overall the consensus was positive and we have a workable plan." },
      { type: "h2", text: "Key initiatives" },
      { type: "li", text: "Finish the migration to the new analytics pipeline by end of May." },
      { type: "li", text: "Reduce time-to-first-response on customer tickets from 6h to under 4h." },
      { type: "li", text: "Hire two additional engineers for the platform team." },
      { type: "h2", text: "Risks" },
      { type: "p", text: "The biggest risk is bandwidth — most of the team is already at capacity. We may need to push the website redesign into Q3 if hiring slips." },
      { type: "h2", text: "Next steps" },
      { type: "p", text: "I'll circulate this with department heads by Friday and we can finalize numbers in the planning review next Tuesday." },
    ],
  },
  {
    title: "Weekly status update",
    body: [
      { type: "h1", text: "Weekly status update" },
      { type: "p", text: "Quick recap of the week. Things are mostly on track; a couple of items to flag." },
      { type: "h2", text: "Wins" },
      { type: "li", text: "Shipped the new onboarding flow on Wednesday — early metrics look promising." },
      { type: "li", text: "Closed three long-standing customer issues this week." },
      { type: "h2", text: "In progress" },
      { type: "li", text: "Database migration is about 60% complete, on track for next sprint." },
      { type: "li", text: "Drafting the API v2 spec — first review scheduled Monday." },
      { type: "h2", text: "Blockers" },
      { type: "p", text: "Still waiting on legal review for the partner integration. I'll follow up with the team again on Friday." },
    ],
  },
  {
    title: "Grocery list",
    body: [
      { type: "h1", text: "Grocery list" },
      { type: "p", text: "Going to the store after work. Adding things as I think of them." },
      { type: "li", text: "Eggs" },
      { type: "li", text: "Bread (sourdough if they have it)" },
      { type: "li", text: "Milk" },
      { type: "li", text: "Bananas" },
      { type: "li", text: "Coffee beans" },
      { type: "li", text: "Pasta sauce" },
      { type: "li", text: "Onions" },
      { type: "li", text: "Olive oil" },
      { type: "li", text: "Yogurt" },
      { type: "li", text: "Toothpaste" },
      { type: "p", text: "Don't forget to bring the reusable bags this time." },
    ],
  },
];

export function pickDecoy(): Decoy {
  return DECOYS[Math.floor(Math.random() * DECOYS.length)];
}
