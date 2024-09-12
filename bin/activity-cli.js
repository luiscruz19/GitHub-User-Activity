#!/usr/bin/env node

import { Command } from 'commander';
import { viewActivity } from '../controllers/activityController.js';

const program = new Command();

// Command to fetch GitHub user activity
program
    .name('github-activity')
    .description('CLI to fetch recent activity of a GitHub user')
    .version('1.0.0')
    .arguments('<username>')
    .action(async (username) => {
        try {
            const events = await viewActivity(username);
            if (events.length === 0) {
                console.log('No recent activity found.');
                return;
            }

            events.forEach(event => {
                switch (event.type) {
                    case 'PushEvent':
                        console.log(`Pushed ${event.payload.commits.length} commits to ${event.repo.name}`);
                        break;
                    case 'IssuesEvent':
                        if (event.payload.action === 'opened') {
                            console.log(`Opened a new issue in ${event.repo.name}`);
                        }
                        break;
                    case 'WatchEvent':
                        if (event.payload.action === 'started') {
                            console.log(`Starred ${event.repo.name}`);
                        }
                        break;
                    default:
                        console.log(`Other event: ${event.type} in ${event.repo.name}`);
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    });

program.parse(process.argv);
