import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import argparse


def load_data(csv_file):
    df = pd.read_csv(csv_file)
    return df


def build_graph(data):
    G = nx.DiGraph()
    

    for _, row in data.iterrows():
        source = row['Source City']
        destination = row['DestinationCity']
        weight = row['Fare']
        
        G.add_edge(source, destination, weight=weight)
    
    return G


def find_shortest_path(graph, source, target):
    try:

        path = nx.dijkstra_path(graph, source, target, weight='weight')
        print(path)

        path_cost = nx.dijkstra_path_length(graph, source, target, weight='weight')
        print(path_cost)
        
        return path, path_cost
    except nx.NetworkXNoPath:
        return None, float('inf')
    
def parse_arguments():
    parser = argparse.ArgumentParser(description='Find the shortest path in a transportation network.')
    parser.add_argument('--source', type=str, required=True, 
                        help='Source node (e.g., "Kanpur_Bus")')
    parser.add_argument('--destination', type=str, required=True, 
                        help='Destination node (e.g., "Patiala_Bus")')
    parser.add_argument('--data', type=str, default='transportation_data.csv',
                        help='Path to the CSV data file')
    parser.add_argument('--visualize', action='store_true',
                        help='Visualize the graph with the shortest path')
    
    return parser.parse_args()


def main():


    args = parse_arguments()

    data = load_data('data.csv')
    

    graph = build_graph(data)
    

    source = args.source
    target = args.destination
    
    path, cost = find_shortest_path(graph, source, target)
    
    if path:
        print(f"Shortest path from {source} to {target}:")
        for i in range(len(path)-1):
            edge_cost = graph[path[i]][path[i+1]]['weight']
            print(f"  {path[i]} -> {path[i+1]} (₹{edge_cost})")
        print(f"Total cost: ₹{cost}")
    else:
        print(f"No path found from {source} to {target}")
    



def visualize_graph(graph, path=None):
    plt.figure(figsize=(12, 10))
    

    pos = nx.spring_layout(graph, seed=42)
    

    nx.draw(graph, pos, with_labels=True, node_size=1500, node_color='skyblue', 
            font_size=10, font_weight='bold', arrows=True)
    

    edge_labels = nx.get_edge_attributes(graph, 'weight')
    nx.draw_networkx_edge_labels(graph, pos, edge_labels=edge_labels)
    

    if path:
        path_edges = [(path[i], path[i+1]) for i in range(len(path)-1)]
        nx.draw_networkx_edges(graph, pos, edgelist=path_edges, width=3, edge_color='red')
    
    plt.title("Transportation Network Graph")
    plt.axis('off')
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    main()