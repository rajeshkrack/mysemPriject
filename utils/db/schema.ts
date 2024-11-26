// Importing necessary functions from the drizzle-orm package for PostgreSQL
import { integer, varchar, pgTable, serial, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

// Define the 'Users' table schema
export const Users = pgTable("users", {
    // 'id' is a serial field (auto-incrementing integer) and the primary key for the table
    id: serial("id").primaryKey(),

    // 'email' is a varchar (string) field, has a maximum length of 255 characters, cannot be null, and must be unique
    email: varchar("email", { length: 255 }).notNull().unique(),

    // 'name' is a varchar (string) field with a maximum length of 255 characters, and cannot be null
    name: varchar("name", { length: 255 }).notNull(),

    // 'createdAt' is a timestamp (date and time) field, defaults to the current time when a record is created, and cannot be null
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define the 'Reports' table schema
export const Reports = pgTable("reports", {
    // 'id' is a serial field (auto-incrementing integer) and the primary key for the table
    id: serial("id").primaryKey(),

    // 'userId' is an integer field, which references the 'id' from the 'Users' table, and cannot be null
    userId: integer("user_id").references(() => Users.id).notNull(),

    // 'location' is a text field that cannot be null
    location: text("location").notNull(),

    // 'wasteType' is a varchar (string) field, has a maximum length of 255 characters, and cannot be null
    wasteType: varchar("waste_type", { length: 255 }).notNull(),

    // 'amount' is a varchar (string) field, has a maximum length of 255 characters, and cannot be null
    amount: varchar("amount", { length: 255 }).notNull(),

    // 'imageUrl' is a text field that stores the image URL (optional, as it can be null)
    imageUrl: text("image_url"),

    // 'verificationResult' is a jsonb field that can store structured data (optional, as it can be null)
    verificationResult: jsonb("verification_result"),

    // 'status' is a varchar (string) field, has a maximum length of 255 characters, cannot be null, and defaults to 'pending'
    status: varchar("status", { length: 255 }).notNull().default("pending"),

    // 'createdAt' is a timestamp (date and time) field, defaults to the current time when a record is created, and cannot be null
    createdAt: timestamp("created_at").defaultNow().notNull(),

    // 'collectorId' is an integer field, which references the 'id' from the 'Users' table (optional, as it can be null)
    collectorId: integer("collector_id").references(() => Users.id),
});

// Define the 'Rewards' table schema
export const Rewards = pgTable("rewards", {
    // 'id' is a serial field (auto-incrementing integer) and the primary key for the table
    id: serial("id").primaryKey(),
  
    // 'userId' is an integer field, which references the 'id' from the 'Users' table, and cannot be null
    userId: integer("user_id").references(() => Users.id).notNull(),
  
    // 'points' is an integer field, cannot be null, and defaults to 0 (represents the reward points)
    points: integer("points").notNull().default(0),
  
    // 'level' is an integer field, cannot be null, and defaults to 1 (represents the reward level)
    level: integer("level").notNull().default(1),
  
    // 'createdAt' is a timestamp (date and time) field, defaults to the current time when a record is created, and cannot be null
    createdAt: timestamp("created_at").defaultNow().notNull(),
  
    // 'updatedAt' is a timestamp (date and time) field, defaults to the current time when a record is created, and cannot be null
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  
    // 'isAvailable' is a boolean field, cannot be null, and defaults to true (indicating if the reward is available)
    isAvailable: boolean("is_available").notNull().default(true),
  
    // 'description' is a text field to store the reward's description (optional field)
    description: text("description"),
  
    // 'name' is a varchar (string) field with a maximum length of 255 characters, and cannot be null (represents the reward's name)
    name: varchar("name", { length: 255 }).notNull(),
  
    // 'collectionInfo' is a text field, cannot be null (contains information about how to collect the reward)
    collectionInfo: text("collection_info").notNull(),
  });

  // Define the 'CollectedWastes' table schema
export const CollectedWastes = pgTable("collected_wastes", {
    // 'id' is a serial field (auto-incrementing integer) and the primary key for the table
    id: serial("id").primaryKey(),
  
    // 'reportId' is an integer field, which references the 'id' from the 'Reports' table, and cannot be null
    reportId: integer("report_id").references(() => Reports.id).notNull(),
  
    // 'collectorId' is an integer field, which references the 'id' from the 'Users' table (the user collecting the waste), and cannot be null
    collectorId: integer("collector_id").references(() => Users.id).notNull(),
  
    // 'collectionDate' is a timestamp (date and time) field, cannot be null (represents the date of waste collection)
    collectionDate: timestamp("collection_date").notNull(),
  
    // 'status' is a varchar (string) field with a maximum length of 20 characters, cannot be null, and defaults to "collected"
    // This field represents the current status of the waste collection (e.g., "collected", "pending", etc.)
    status: varchar("status", { length: 20 }).notNull().default("collected"),
  });

  // Define the 'Notifications' table schema
export const Notifications = pgTable("notifications", {
    // 'id' is a serial field (auto-incrementing integer) and the primary key for the table
    id: serial("id").primaryKey(),
  
    // 'userId' is an integer field that references the 'id' of a user in the 'Users' table, and cannot be null
    userId: integer("user_id").references(() => Users.id).notNull(),
  
    // 'message' is a text field, which holds the notification message, and cannot be null
    message: text("message").notNull(),
  
    // 'type' is a varchar field with a maximum length of 50 characters, representing the notification type (e.g., 'alert', 'info')
    type: varchar("type", { length: 50 }).notNull(),
  
    // 'isRead' is a boolean field, which indicates whether the notification has been read or not. Defaults to 'false'
    isRead: boolean("is_read").notNull().default(false),
  
    // 'createdAt' is a timestamp field which records the date and time when the notification was created. Cannot be null, with a default value of the current date and time
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  // Define the 'Transactions' table schema
  export const Transactions = pgTable("transactions", {
    // 'id' is a serial field (auto-incrementing integer) and the primary key for the table
    id: serial("id").primaryKey(),
  
    // 'userId' is an integer field that references the 'id' of a user in the 'Users' table, and cannot be null
    userId: integer("user_id").references(() => Users.id).notNull(),
  
    // 'type' is a varchar field with a maximum length of 20 characters, representing the transaction type (e.g., 'earned', 'redeemed')
    type: varchar("type", { length: 20 }).notNull(),
  
    // 'amount' is an integer field that stores the amount involved in the transaction (e.g., number of points), and cannot be null
    amount: integer("amount").notNull(),
  
    // 'description' is a text field that provides a description of the transaction, and cannot be null
    description: text("description").notNull(),
  
    // 'date' is a timestamp field that records the date and time of the transaction. Cannot be null, with a default value of the current date and time
    date: timestamp("date").defaultNow().notNull(),
  });
  