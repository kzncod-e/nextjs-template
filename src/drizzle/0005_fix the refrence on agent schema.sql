PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_summary` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`successRate` text,
	`agentId` integer NOT NULL,
	`notes` text,
	FOREIGN KEY (`agentId`) REFERENCES `agentsActivity`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_summary`("id", "successRate", "agentId", "notes") SELECT "id", "successRate", "agentId", "notes" FROM `summary`;--> statement-breakpoint
DROP TABLE `summary`;--> statement-breakpoint
ALTER TABLE `__new_summary` RENAME TO `summary`;--> statement-breakpoint
PRAGMA foreign_keys=ON;