import numpy as np
import joblib

class KNNClassifier:
    def __init__(self, k=3, feature_range=(-1, 1)):
        self.k = k
        self.feature_range = feature_range
        self.X_train = None
        self.y_train = None
        self.min_vals = None
        self.max_vals = None

    def _scale_features(self, df):
        scale = self.feature_range[1] - self.feature_range[0]
        return (df - self.min_vals) / (self.max_vals - self.min_vals) * scale + self.feature_range[0]

    def _euclidean_distance(self, instance):
        return np.sqrt(np.sum((self.X_train - instance) ** 2, axis=1))

    def fit(self, X, y):
        self.min_vals = X.min()
        self.max_vals = X.max()
        X_scaled = self._scale_features(X)
        self.X_train = X_scaled.to_numpy()
        self.y_train = y.to_numpy()

    def _predict_instance(self, instance):
        distances = self._euclidean_distance(instance)
        nearest_indices = distances.argsort()[:self.k]
        nearest_labels = self.y_train[nearest_indices]
        return np.bincount(nearest_labels).argmax()

    def predict(self, X):
        X_scaled = self._scale_features(X)
        return [self._predict_instance(instance) for instance in X_scaled.to_numpy()]

    def save(self, filepath):
        joblib.dump(self, filepath)

    @staticmethod
    def load(filepath):
        return joblib.load(filepath)