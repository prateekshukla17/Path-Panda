import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt



df = pd.read_csv('data.csv')


G = nx.DiGraph()


for _, row in df.iterrows():
    source = row['Source City']
    destination = row['DestinationCity']
    fare = row['Fare']
    G.add_edge(source, destination, weight=fare)


edge_labels = nx.get_edge_attributes(G, 'weight')


plt.figure(figsize=(15, 12))
pos = nx.spring_layout(G, seed=42)  

nx.draw_networkx_nodes(G, pos, node_size=1000, node_color='lightblue')
nx.draw_networkx_edges(G, pos, arrowstyle='->', arrowsize=15, edge_color='gray')
nx.draw_networkx_labels(G, pos, font_size=10, font_weight='bold')
nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=8)

plt.title("Transportation Network Graph (Directed with Fares)", fontsize=16)
plt.axis('off')
plt.tight_layout()
plt.show()