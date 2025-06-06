import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from Models.ML_Models.knn_classifier import KNNClassifier

dataset = pd.read_csv('Data/MyDataset.csv')
print(dataset.head())


def label_encode(series):
    unique_values = series.unique()
    encoding_dict = {value: idx for idx, value in enumerate(unique_values)}
    encoded_series = series.map(encoding_dict)
    return encoded_series, encoding_dict


dataset['Pump Data'], label_encoding_dict = label_encode(dataset['Pump Data'])
print("Мапінг міток:", label_encoding_dict)

dataset.fillna(dataset.mean(numeric_only=True), inplace=True)

plt.figure(figsize=(10, 8))
corr = dataset.corr(numeric_only=True)
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt='.3f')
plt.title('Кореляційна матриця ознак')
plt.show()

features = dataset.drop(columns=['Pump Data'])
target = dataset['Pump Data']


def train_test_split_manual(X, y, test_size=0.3, random_state=7):
    np.random.seed(random_state)
    indices = np.arange(len(X))
    np.random.shuffle(indices)

    split_idx = int(len(X) * (1 - test_size))
    train_indices = indices[:split_idx]
    test_indices = indices[split_idx:]

    X_train = X.iloc[train_indices]
    X_test = X.iloc[test_indices]
    y_train = y.iloc[train_indices]
    y_test = y.iloc[test_indices]

    return X_train, X_test, y_train, y_test


X_train, X_test, y_train, y_test = train_test_split_manual(features, target)

model = KNNClassifier(k=3)
model.fit(X_train, y_train)
model.save("Models/ML_Models/pump_model.joblib")

model = KNNClassifier.load("Models/ML_Models/pump_model.joblib")
y_pred = model.predict(X_test)


def accuracy_score(y_true, y_pred):
    return np.mean(np.array(y_true) == np.array(y_pred))


accuracy = accuracy_score(y_test, y_pred)
print(f"[INFO] Точність моделі KNN: {accuracy * 100:.2f}%")


def confusion_matrix(y_true, y_pred):
    labels = np.unique(np.concatenate((y_true, y_pred)))
    matrix = np.zeros((len(labels), len(labels)), dtype=int)
    label_to_index = {label: index for index, label in enumerate(labels)}
    for true_label, pred_label in zip(y_true, y_pred):
        i = label_to_index[true_label]
        j = label_to_index[pred_label]
        matrix[i, j] += 1
    return matrix, labels


cm, labels = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='crest', xticklabels=labels, yticklabels=labels)
plt.xlabel("Передбачений клас")
plt.ylabel("Справжній клас")
plt.title("Матриця плутанини")
plt.show()


def classification_report_manual(y_true, y_pred):
    labels = np.unique(np.concatenate((y_true, y_pred)))
    report = {}
    for label in labels:
        tp = np.sum((np.array(y_true) == label) & (np.array(y_pred) == label))
        fp = np.sum((np.array(y_true) != label) & (np.array(y_pred) == label))
        fn = np.sum((np.array(y_true) == label) & (np.array(y_pred) != label))
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0
        f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0
        support = np.sum(np.array(y_true) == label)
        report[label] = {
            'precision': precision,
            'recall': recall,
            'f1-score': f1,
            'support': support
        }
    print("Клас | Precision | Recall | F1-Score | Support")
    for label in labels:
        r = report[label]
        print(f"{label:5} | {r['precision']:.2f}     | {r['recall']:.2f} | {r['f1-score']:.2f}    | {r['support']}")


classification_report_manual(y_test, y_pred)
