import heapq
f = open("src/2024/day-16/input.txt", "r")
maze = f.read()
print(maze)

def parse_maze(maze):
    """Parse the maze into a grid and find the start and end positions."""
    grid = [list(row) for row in maze.strip().split("\n")]
    start = end = None
    for i, row in enumerate(grid):
        for j, cell in enumerate(row):
            if cell == 'S':
                start = (i, j)
            elif cell == 'E':
                end = (i, j)
    return grid, start, end

def reindeer_maze_solver(maze):
    """Find the lowest score to navigate the maze."""
    grid, start, end = parse_maze(maze)

    # Directions: N, E, S, W
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    direction_names = ['N', 'E', 'S', 'W']

    # Priority queue: (cost, x, y, direction_index)
    pq = [(0, start[0], start[1], 1)]  # Start facing East (index 1)

    # Visited states: (x, y, direction_index)
    visited = set()

    while pq:
        cost, x, y, d = heapq.heappop(pq)

        # If we've reached the end, return the cost
        if (x, y) == end:
            return cost

        # Skip if already visited
        if (x, y, d) in visited:
            continue
        visited.add((x, y, d))

        # Explore neighbors
        for i, (dx, dy) in enumerate(directions):
            nx, ny = x + dx, y + dy

            # If moving forward, ensure the cell is valid
            if i == d and 0 <= nx < len(grid) and 0 <= ny < len(grid[0]) and grid[nx][ny] != '#':
                heapq.heappush(pq, (cost + 1, nx, ny, d))

        # Explore turning
        for turn in [-1, 1]:  # -1 = counterclockwise, +1 = clockwise
            nd = (d + turn) % 4
            heapq.heappush(pq, (cost + 1000, x, y, nd))

print(reindeer_maze_solver(maze))
