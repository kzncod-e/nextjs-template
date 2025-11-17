CREATE TABLE `activity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`agentId` integer NOT NULL,
	`description` text,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	FOREIGN KEY (`agentId`) REFERENCES `agentsActivity`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `agentsActivity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`agent` text,
	`platform` text,
	`status` text,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `summary` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`successRate` text,
	`agentId` integer NOT NULL,
	`notes` text,
	FOREIGN KEY (`agentId`) REFERENCES `agentsActivity`(`id`) ON UPDATE no action ON DELETE no action
);
